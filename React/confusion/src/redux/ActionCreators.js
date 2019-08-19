import * as ActionTypes from './ActionTypes';
import createDishes from '../shared/dishes';

export const addComment = (dishId, rating, author, sentence) => ({ // eslint-disable-line import/prefer-default-export
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    sentence,
  },
});

export const addDish = (category, description, featured, id, image, label, name, price) => ({ // eslint-disable-line import/prefer-default-export
  type: ActionTypes.ADD_DISH,
  payload: {
    category,
    description,
    featured,
    id,
    image,
    label,
    name,
    price,
  },
});

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = errmess => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchDishesAndComments = () => (dispatch) => {
  dispatch(dishesLoading(true));

  const dishes = [];
  const dishesComments = [];


  createDishes.then((dishArray) => {
    dishArray.forEach((dishItem) => {
      const dish = { ...dishItem };
      delete dish.comments;

      const {
        category, description, featured, id, image, label, name, price,
      } = dish;

      dishes.push({
        category, description, featured, id, image, label, name, price,
      });

      const { comments } = dishItem;
      comments.forEach((commentItem) => {
        const {
          dishId, rating, author, sentence,
        } = commentItem;

        dishesComments.push({
          dishId, rating, author, sentence,
        });
      });
    });
  });

  setTimeout(() => {
    dispatch(addDishes(dishes));
    dispatch(addComments(dishesComments));
  }, 2000);
};