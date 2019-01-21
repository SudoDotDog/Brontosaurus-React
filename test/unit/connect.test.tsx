/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Connect
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from "react";
import { withBrontosaurus } from '../../src/connect';
import { MockComponent } from "../mock/mock";

describe('Given a [withBrontosaurus] Helper function', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-react-connect');
    const Connected: React.ComponentType = withBrontosaurus(MockComponent);

    const render = (props: any = {}, children: string = chance.string()): ShallowWrapper<any> => {

        return shallow(<Connected {...props}>{children}</Connected>);
    };

    it('should render a component element', (): void => {

        const component: ShallowWrapper<any> = render();

        expect(component.type()).to.be.equal(MockComponent);
    });

    it('should have auth props', (): void => {

        const component: ShallowWrapper<any> = render();

        // tslint:disable-next-line
        expect(component.props().auth).to.be.exist;
        // tslint:disable-next-line
        expect(component.props().auth.visit).to.be.instanceOf(Function);
        // tslint:disable-next-line
        expect(component.props().auth.strict).to.be.instanceOf(Function);
    });

    it('should be able to render children', (): void => {

        const content: string = chance.string();
        const component: ShallowWrapper<any> = render({}, content);

        expect(component.html()).to.be.equal(content);
    });

    it('should be able to pass props', (): void => {

        const key: string = chance.string();
        const value: string = chance.string();
        const component: ShallowWrapper<any> = render({
            [key]: value,
        });

        expect(component.props()[key]).to.be.equal(value);
    });
});
