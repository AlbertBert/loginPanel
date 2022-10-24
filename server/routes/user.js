const Router = require('koa-router');
const Model  = require('../models/model');
const router = new Router();

router.post('/login', async (ctx, next) => {
  const body = ctx.request.body;
  const { username, password } = body;
  console.log('body', body);


  // 查询username是否存在
  try {
    const data = await Model.findOne({
      username
    });

    console.log('data', data);

    if (!data) {
      ctx.body = {
        code: 2000,
        message: 'user not exist',
      };
    } else if (data.password !== password) {
      ctx.body = {
        code: 2001,
        message: 'password is not correct',
      };
    } else {
      ctx.body = {
        code: 0,
        message: 'success'
      };
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    }
  }
})

router.post('/register', async (ctx, next) => {
  const body = ctx.request.body;
  console.log('body', body);
  const { username, password } = body;

  try {
    const data = await Model.findOne({
      username
    });
    console.log('data', data);
    if (data) {
      ctx.body = {
        code: 2002,
        message: 'user has register',
      };
    } else {
      const data = new Model({
        username,
        password
      })
      console.log('data', data);
      const dataToSave = data.save();
      ctx.body = {
        code: 0,
        message: 'success'
      };
    }
  } catch (error) {
    ctx.body = {
      message: error.message
    }
  }
})

module.exports = router.routes();