/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Route
 */

import { Brontosaurus, Token } from "@brontosaurus/web";
import * as React from "react";
import { Route, RouteComponentProps, RouteProps } from "react-router-dom";

export type SecureRouteProps = {
    readonly all?: boolean;
    readonly groups?: string[];
    readonly fallbackComponent?: React.ComponentType<any>;
} & RouteProps;

export const SecureRoute: React.FC<SecureRouteProps> = (props: SecureRouteProps) => {

    return React.createElement(Route, {
        path: props.path,
        exact: props.exact,
        render: (renderProps: RouteComponentProps) => {

            const getFallback = () => props.fallbackComponent ? React.createElement(props.fallbackComponent, renderProps) : null;

            if (props.groups) {

                const token: Token = Brontosaurus.hard();

                if (Boolean(props.all)) {
                    if (!token.hasGroups(...props.groups)) {
                        return getFallback();
                    }
                } else {
                    if (!token.hasOneOfGroup(...props.groups)) {
                        return getFallback();
                    }
                }
            }

            if (props.component) {
                return React.createElement(props.component, renderProps);
            } else if (props.render) {
                return props.render(renderProps);
            }

            return getFallback();
        },
    } as RouteProps);
};
