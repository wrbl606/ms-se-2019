const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

router.post('/gh', function(req, res, next) {
  const body = JSON.parse(req.body);
  const ref = body.ref;

  if (ref === 'refs/heads/master') {
    exec('./exec.sh', (error, stdout, stderr) => {
      if (error) {
        return res.send(`{"error": "exec error: ${error}"`);
      }
      return res.send(`{"error": "${stderr}", "result": "${stdout}"`);
    });
  } else {
    return res.status(400);
  }
});

module.exports = router;
