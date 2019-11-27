/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Common
 */

import * as React from "react";

export const getFallbackComponent = (renderProps: any, fallbackComponent?: React.ComponentType<any>): React.ReactNode => {

    if (fallbackComponent) {
        return React.createElement(fallbackComponent, renderProps);
    }

    return null;
};
