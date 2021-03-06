///<reference path="../../src/interfaces/interfaces.d.ts" />

import { expect } from "chai";
import { injectable, decorate } from "../../src/inversify";
import * as METADATA_KEY from "../../src/constants/metadata_keys";
import * as ERRORS_MSGS from "../../src/constants/error_msgs";
import * as Stubs from "../utils/stubs";

describe("@inject", () => {

    let WarriotWithoutInjections = Stubs.WarriotWithoutInjections;
    let Warrior = Stubs.Warrior;

    it("Should not generate metadata when not applied", () => {
        let metadata = Reflect.getMetadata(METADATA_KEY.INJECTABLE, WarriotWithoutInjections);
        expect(metadata).to.be.undefined;
    });

    it("Should generate metadata if declared injections", () => {

        let metadata = Reflect.getMetadata(METADATA_KEY.INJECTABLE, Warrior);
        expect(metadata).to.be.instanceof(Array);

        expect(metadata[0]).to.be.eql("IKatana");
        expect(metadata[1]).to.be.eql("IShuriken");
        expect(metadata[2]).to.be.undefined;
    });

    it("Should throw when applayed mutiple times", () => {

        class Test {}

        let useDecoratorMoreThanOnce = function() {
            decorate(injectable("IKatana", "IShuriken"), Test);
            decorate(injectable("IKatana", "IShuriken"), Test);
        };

        expect(useDecoratorMoreThanOnce).to.throw(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
    });

    it("Should be usable in VanillaJS applications", () => {

        interface IKatana {}
        interface IShuriken {}

        let VanillaJSWarrior = (function () {
            function VanillaJSWarrior(primary: IKatana, secondary: IShuriken) {
                // ...
            }
            return VanillaJSWarrior;
        })();

        decorate(injectable("IKatana", "IShuriken"), VanillaJSWarrior);

        let metadata = Reflect.getMetadata(METADATA_KEY.INJECTABLE, VanillaJSWarrior);
        expect(metadata).to.be.instanceof(Array);
        expect(metadata[0]).to.be.eql("IKatana");
        expect(metadata[1]).to.be.eql("IShuriken");
        expect(metadata[2]).to.be.undefined;
    });

});
