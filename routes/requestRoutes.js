const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const Request = require('../models/request');

function getCostCategory(resource, duration, usage) {

  if (
    (resource === 'compute' || resource === 'database')
    && duration > 30
    && usage > 70
  ) {
    return 'high';
  }

  if (usage > 40 || duration > 15) {
    return 'medium';
  }

  return 'low';
}


router.post('/create', async (req, res) => {

  try {

    const data = req.body;

    // Validation
    if (
      !data.requester_name ||
      !data.purpose ||
      !data.access_justification
    ) {

      return res.status(400).json({
        message: "Missing required fields"
      });

    }

    if (data.duration_days <= 0) {

      return res.status(400).json({
        message: "Invalid duration"
      });

    }

    // Cost category logic
    data.cost_category = getCostCategory(
      data.resource_type,
      data.duration_days,
      data.usage_estimate
    );

    // Duplicate request check
    const existingRequest =
      await Request.findOne({

        where: {
          requester_name: data.requester_name,
          purpose: data.purpose
        }

      });

    if (existingRequest) {

      return res.status(400).json({
        message: "Duplicate request detected"
      });

    }

    // Create request
    const request = await Request.create(data);

    res.json(request);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.get('/all', async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.json(requests);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


router.put('/approve/:id', async (req, res) => {

  try {

    const request = await Request.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    // Governance Validation
    if (
      !request.requester_name ||
      !request.purpose ||
      !request.access_justification
    ) {
      return res.status(400).json({
        message: "Incomplete request cannot be approved"
      });
    }

    request.status = 'approved';

    request.reviewer_comments =
      req.body.reviewer_comments;

    request.owner =
      req.body.owner;

    request.expiry_date =
      req.body.expiry_date;

    await request.save();

    res.json({
      message: "Request approved",
      request
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


router.put('/reject/:id', async (req, res) => {

  try {

    const request = await Request.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    request.status = 'rejected';

    request.reviewer_comments =
      req.body.reviewer_comments;

    await request.save();

    res.json({
      message: "Request rejected",
      request
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


router.put('/status/:id', async (req, res) => {

  try {

    const request = await Request.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    const newStatus = req.body.status;

    // Invalid close check
    if (
      newStatus === 'closed'
      && request.status !== 'active'
    ) {
      return res.status(400).json({
        message: "Only active requests can be closed"
      });
    }

    request.status = newStatus;

    await request.save();

    res.json({
      message: "Status updated",
      request
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


router.get('/filter', async (req, res) => {

  try {

    const filters = {};

    if (req.query.status) {
      filters.status = req.query.status;
    }

    if (req.query.requester_name) {
      filters.requester_name =
        req.query.requester_name;
    }

    if (req.query.resource_type) {
      filters.resource_type =
        req.query.resource_type;
    }

    if (req.query.environment) {
      filters.environment =
        req.query.environment;
    }

    if (req.query.cost_category) {
      filters.cost_category =
        req.query.cost_category;
    }

    const requests =
      await Request.findAll({
        where: filters
      });

    res.json(requests);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


router.get('/dashboard/summary', async (req, res) => {

  try {

    const total =
      await Request.count();

    const approved =
      await Request.count({
        where: { status: 'approved' }
      });

    const rejected =
      await Request.count({
        where: { status: 'rejected' }
      });

    const active =
      await Request.count({
        where: { status: 'active' }
      });

    const expired =
      await Request.count({
        where: { status: 'expired' }
      });

    const highCost =
      await Request.count({
        where: {
          cost_category: 'high'
        }
      });

    res.json({
      total_requests: total,
      approved_requests: approved,
      rejected_requests: rejected,
      active_resources: active,
      expired_resources: expired,
      high_cost_requests: highCost
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


router.get('/dashboard/reminders', async (req, res) => {

  try {

    const today = new Date();

    const next7Days = new Date();

    next7Days.setDate(today.getDate() + 7);

    // Expiring soon
    const expiringSoon =
      await Request.findAll({

        where: {

          expiry_date: {
            [Op.lte]: next7Days,
            [Op.gte]: today
          }

        }

      });

    // Missing ownership
    const missingOwner =
      await Request.findAll({

        where: {

          [Op.or]: [
            { owner: null },
            { owner: '' }
          ]

        }

      });

    res.json({
      expiring_soon: expiringSoon,
      missing_owner: missingOwner
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


router.get('/report/final', async (req, res) => {

  try {

    const requests =
      await Request.findAll();

    const total =
      requests.length;

    const approved =
      requests.filter(
        r => r.status === 'approved'
      ).length;

    const rejected =
      requests.filter(
        r => r.status === 'rejected'
      ).length;

    const active =
      requests.filter(
        r => r.status === 'active'
      ).length;

    const expired =
      requests.filter(
        r => r.status === 'expired'
      ).length;

    const highCost =
      requests.filter(
        r => r.cost_category === 'high'
      ).length;

    res.json({

      governance_summary: {
        total,
        approved,
        rejected,
        active,
        expired,
        highCost
      },

      requests

    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


router.put('/check-expiry', async (req, res) => {

  try {

    const today = new Date();

    const expiredRequests =
      await Request.findAll({

        where: {

          expiry_date: {
            [Op.lt]: today
          },

          status: 'active'

        }

      });

    for (let request of expiredRequests) {

      request.status = 'expired';

      await request.save();

    }

    res.json({
      message: "Expiry check completed",
      expired_count: expiredRequests.length
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


module.exports = router;
