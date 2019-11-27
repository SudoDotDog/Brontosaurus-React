/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Common
 */

import * as React from "react";

export const getPartialComponent = (renderProps: any, component?: React.ComponentType<any>): React.ReactNode => {

    if (component) {
        return React.createElement(component, renderProps);
    }

    return null;
};
