import React from 'react';

import ApplicationPage from 'terra-application/lib/application-page/ApplicationPage';
import IconPrinter from 'terra-icon/lib/icon/IconPrinter';
import IconTag from 'terra-icon/lib/icon/IconTag';

import ModalPresenter from '../../ModalPresenter';
import PendingActionToggle from '../../PendingActionToggle';
import LoadingOverlayPresenter from '../../LoadingOverlayPresenter';
import ErrorThrower from '../../ErrorThrower';
import ApplicationPageContainer from '../../../../../../application-page/ApplicationPageContainer';
import SimplePage from './SimplePage';

const ExamplePage = ({ index, prefix, onRequestDismiss }) => {
  const [initializedDate] = React.useState(new Date().toLocaleString());
  const [showModal, setShowModal] = React.useState(false);
  const [showNestedPage, setShowNestedPage] = React.useState(false);
  const [showSimplePage, setShowSimplePage] = React.useState(false);
  const [simplePageState, setSimplePageState] = React.useState(Math.random());

  React.useEffect(() => {
    if (!showSimplePage) {
      return;
    }

    const interval = setInterval(() => {
      setSimplePageState(Math.random());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [showSimplePage]);

  const pageActions = [{
    key: 'action-print',
    text: 'Print',
    icon: <IconPrinter />,
    onSelect: () => alert(`Page ${index} Printing`),
  }, {
    key: 'action-tag',
    text: 'Tag',
    icon: <IconTag />,
    onSelect: () => alert(`Page ${index} Tagging`),
  }];

  return (
    <ApplicationPage
      pageTitle={`${prefix} - Page ${index}`}
      onBack={onRequestDismiss}
      pageActions={pageActions}
    >
      <div style={{ padding: '1.5rem' }}>
        <h1>
          Page
          {' '}
          {index}
        </h1>
        <p>
            Initialized:
          {' '}
          {initializedDate}
        </p>
        <button
          type="button"
          onClick={() => {
            setShowNestedPage(true);
          }}
        >
        Show Page
          {' '}
          {index + 1}
        </button>
        <br />
        <button
          type="button"
          onClick={() => {
            setShowSimplePage(true);
          }}
        >
        Show Simple Page
        </button>
        <br />
        <ErrorThrower />
        <ModalPresenter
          modalContent={(
            <ApplicationPageContainer>
              <ExamplePage prefix="Modal" index={0} />
            </ApplicationPageContainer>
          )}
        />
        <PendingActionToggle />
        <LoadingOverlayPresenter />
        {showNestedPage && <ExamplePage prefix={prefix} index={index + 1} onRequestDismiss={() => { setShowNestedPage(false); }} />}
        {showSimplePage && <SimplePage onRequestDismiss={() => { setShowSimplePage(false); }} simplePageState={simplePageState} />}
      </div>
    </ApplicationPage>
  );
};

export default ExamplePage;