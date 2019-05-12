/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Connect
 */

import { Brontosaurus, Token } from "@brontosaurus/web";
import * as React from "react";
import { BrontosaurusProps, ExcludeAuth } from "./declare";

export const withBrontosaurus = <T extends BrontosaurusProps>(Component: any): React.ComponentType<ExcludeAuth<T>> =>

    <P extends React.Props<T>>(originProps: P) =>

        React.createElement(Component, {
            ...originProps,
            auth: {
                visit: (): Token | null => Brontosaurus.soft(),
                strict: (): Token => Brontosaurus.hard(),
            },
        });
