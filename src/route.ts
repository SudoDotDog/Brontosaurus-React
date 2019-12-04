/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Route
 */

import { Brontosaurus, Token } from "@brontosaurus/web";
import * as React from "react";
import { Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { getPartialComponent } from "./common";

export type SecureRouteProps = {

    readonly all?: boolean;
    readonly reverse?: boolean;
    readonly groups?: string[];
    readonly fallbackComponent?: React.ComponentType<any>;
} & RouteProps;

export const SecureRoute: React.FC<SecureRouteProps> = (props: SecureRouteProps) => {

    return React.createElement(Route, {
        path: props.path,
        exact: props.exact,
        render: (renderProps: RouteComponentProps) => {

            if (props.groups) {

                const token: Token = Brontosaurus.hard();

                if (Boolean(props.all)) {
                    if (!token.hasGroups(...props.groups)) {
                        return getPartialComponent(renderProps, props.fallbackComponent);
                    }
                } else if (Boolean(props.reverse)) {
                    if (!token.hasNoGroups(...props.groups)) {
                        return getPartialComponent(renderProps, props.fallbackComponent);
                    }
                } else {
                    if (!token.hasOneOfGroup(...props.groups)) {
                        return getPartialComponent(renderProps, props.fallbackComponent);
                    }
                }
            }

            if (props.component) {
                return React.createElement(props.component, renderProps);
            } else if (props.render) {
                return props.render(renderProps);
            }

            return getPartialComponent(renderProps, props.fallbackComponent);
        },
    } as RouteProps);
};
