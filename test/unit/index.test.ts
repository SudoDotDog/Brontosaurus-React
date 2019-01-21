/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Index
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { EnableForGroup, withBrontosaurus } from '../../src/index';

describe('Given a {Index} Class', (): void => {

    const chance: Chance.Chance = new Chance('brontosaurus-react-index');

    it('should be able to export function', (): void => {

        const func: any = withBrontosaurus;

        expect(func).to.be.instanceOf(Function);
    });

    it('should be able to export group component', (): void => {

        const func: any = EnableForGroup;

        expect(func).to.be.instanceOf(Function);
    });
});
