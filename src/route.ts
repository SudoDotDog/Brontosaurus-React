/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Route
 */

import { Brontosaurus, Token } from "@brontosaurus/web";
import * as React from "react";
import { Route, RouteComponentProps, RouteProps } from "react-router-dom";

export type SecureRouteProps = {
    readonly groups: string[];
    readonly fallbackComponent?: React.ComponentType<any>;
    readonly all?: boolean;
} & RouteProps;

export const SecureRoute: React.FC<SecureRouteProps> = (props: SecureRouteProps) => {

    return React.createElement(Route, {
        path: props.path,
        exact: props.exact,
        render: (renderProps: RouteComponentProps) => {

            const token: Token = Brontosaurus.hard();

            if (Boolean(props.all)) {
                if (!token.hasGroups(...props.groups)) {
                    return props.fallbackComponent ? React.createElement(props.fallbackComponent, renderProps) : null;
                }
            } else {
                if (!token.hasOneOfGroup(...props.groups)) {
                    return props.fallbackComponent ? React.createElement(props.fallbackComponent, renderProps) : null;
                }
            }

            if (props.component) {
                return React.createElement(props.component, renderProps);
            } else {
                return props.render(renderProps);
            }
        },
    } as RouteProps);
};
