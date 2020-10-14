import React, { Component } from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';

const withRouterComponent = Components => {
  class DataFormRoute extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      const { forwardedRef, ...rest } = this.props;
      return (
        <Route
          children={routeComponentProps => {
            return <Components {...rest} {...routeComponentProps} ref={forwardedRef} />;
          }}
        />
      );
    }
  }
  return React.forwardRef((props, ref) => {
    return <DataFormRoute {...props} forwardedRef={ref} />;
  });
};

const dataFormComponent = WrappedComponent => {
  class DataForm extends Component {
    constructor(props) {
      super(props);
    }
    listenUrlChange(fn = () => { }) {
      return this.unListen = this.props.history.listen((location, action) => fn(location, action));
    }
    componentWillUnmount() {
      this.unListen && this.unListen();
    }
    setVal2Url(val = {}, cover = false) {
      const url = `${this.history.location.pathname}?${queryString.stringify(cover ? val : { ...this.getUrl2Val(), ...val })}`;
      this.history.replace(url);
      return {
        url,
      };
    }
    getUrl2Val() {
      return queryString.parse(this.history.location.search);
    }
    render() {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent
        setVal2Url={this.setVal2Url}
        getUrl2Val={this.getUrl2Val}
        listenUrlChange={this.listenUrlChange.bind(this)}
        {...rest}
        ref={forwardedRef}
      />;
    }
  }
  return React.forwardRef((props, ref) => {
    return <DataForm {...props} forwardedRef={ref} />;
  });
};

export default WrappedComponent => {
  return withRouterComponent(dataFormComponent(WrappedComponent));
};
