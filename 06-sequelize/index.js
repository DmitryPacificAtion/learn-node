const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const commonController = require('./controllers/common');
const sequelize = require('./util/db');
const ProductModel = require('./models/product');
const BasketModel = require('./models/basket');
const BasketItemModel = require('./models/basket-item');
const OrderModel = require('./models/order');
const OrderItemModel = require('./models/order-item');
const UserModel = require('./models/user');
const app = express();

const DEFAULT_USER_EMAIL = 'my@mail.com';

app.set('view engine', 'ejs');
app.set('views', './06-sequelize/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  UserModel.findByPk(DEFAULT_USER_EMAIL)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.error(error));
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(commonController.get404Page);

ProductModel.belongsTo(UserModel, { constraints: true, onDelete: 'CASCADE' });
UserModel.hasMany(ProductModel);
// =============== //
UserModel.hasOne(BasketModel);
BasketModel.belongsTo(UserModel);
// =============== //
BasketModel.belongsToMany(ProductModel, { through: BasketItemModel });
ProductModel.belongsToMany(BasketModel, { through: BasketItemModel });
// =============== //
OrderModel.belongsTo(UserModel);
UserModel.hasMany(OrderModel);
OrderModel.belongsToMany(ProductModel, { through: OrderItemModel });
ProductModel.belongsToMany(OrderModel, { through: OrderItemModel });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return UserModel.findByPk(DEFAULT_USER_EMAIL);
  })
  .then((user) => {
    if (!user) {
      UserModel.create({ name: 'Dmytro', email: DEFAULT_USER_EMAIL });
    }
    return user;
  })
  .then(async (user) => {
    const basket = await user.getBasket({ with: { email: user.userEmail } });
    if (!basket) {
      return user.createBasket();
    }
    return basket;
  })
  .then(() => {
    app.listen(3001);
  })
  .catch((error) => console.error('*** ERROR! ***', error));
