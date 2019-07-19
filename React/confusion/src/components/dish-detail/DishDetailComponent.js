import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import './DishDetailComponent.scss';

function RenderComments({ comments = [] }) {
  if (comments.length > 0) {
    const selectedDishComments = comments.map((comment) => {
      const {
        id, author, data, sentence,
      } = comment;

      return (
        <Row key={id}>
          <CardText>{sentence}</CardText>
          <CardText>{`-- ${author}, ${data}`}</CardText>
          <CardText> </CardText>
          <CardText> </CardText>
        </Row>
      );
    });

    return (
      <Col xs={6} md={6}>
        <Row className="item">
          <h4>Comments</h4>
        </Row>
        <Row className="item">
          {selectedDishComments}
        </Row>
      </Col>
    );
  }
  return '';
}

RenderComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * @type {propTypes}
 * @param {Object} dish - The selected dish
 */
function RenderDish({ dish }) {
  const { image, name, description } = dish;
  return (
    <Col xs={6} md={6} key={dish.id}>
      <Card className="item">
        <CardImg src={image} alt={name} />
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
}

RenderDish.propTypes = {
  dish: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

/**
 * @type {defaultProps}
 * @prop {object} - default dish value.
 */
RenderDish.defaultProps = {
  dish: {},
};

/**
     * Render function.
     *
     * @returns {Object} A dom element for an element.
     */
const DishDetail = (props) => {
  const { dish } = props;

  if (!isEmpty(dish)) {
    const { comments } = dish;
    return (
      <Row className="show-item">
        <RenderDish dish={dish} />
        <RenderComments comments={comments} />
      </Row>
    );
  }
  return (
    <div />
  );
};

DishDetail.propTypes = {
  dish: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

/**
 * @type {defaultProps}
 * @prop {object} - default dish value.
 */
DishDetail.defaultProps = {
  dish: {},
};

export default DishDetail;