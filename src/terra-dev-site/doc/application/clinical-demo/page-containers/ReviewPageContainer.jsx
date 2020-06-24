import React from 'react';
import ApplicationPageContainer from 'terra-application/lib/application-page/ApplicationPageContainer';
import ChartReviewPage from '../pages/ChartReviewPage';

const propTypes = {};

const ReviewPageContainer = () => (
  <ApplicationPageContainer>
    <ChartReviewPage />
  </ApplicationPageContainer>
);

ReviewPageContainer.propTypes = propTypes;

export default ReviewPageContainer;