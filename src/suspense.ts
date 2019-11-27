/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Lazy Route
 */

import { Brontosaurus, Token } from "@brontosaurus/web";
import * as React from "react";
import { Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { getFallbackComponent } from "./common";

export type SecureLazyRouteProps = {
    readonly all?: boolean;
    readonly groups?: string[];
    readonly fallbackComponent?: React.ComponentType<any>;
    readonly loadingComponent?: React.ComponentType<any>;

    readonly path?: string | string[];
    readonly exact?: boolean;
    readonly sensitive?: boolean;
    readonly strict?: boolean;

    readonly render: () => any;
};

export const SecureLazyRoute: React.FC<SecureLazyRouteProps> = (props: SecureLazyRouteProps) => {

    return React.createElement(Route, {
        path: props.path,
        exact: props.exact,
        render: (renderProps: RouteComponentProps) => {

            if (props.groups) {

                const token: Token = Brontosaurus.hard();

                if (Boolean(props.all)) {
                    if (!token.hasGroups(...props.groups)) {
                        return getFallbackComponent(renderProps, props.fallbackComponent);
                    }
                } else {
                    if (!token.hasOneOfGroup(...props.groups)) {
                        return getFallbackComponent(renderProps, props.fallbackComponent);
                    }
                }
            }

            return React.createElement(React.Suspense, {
                fallback: props.loadingComponent,
            }, React.createElement(React.lazy(props.render), renderProps));
        },
    } as RouteProps);
};
