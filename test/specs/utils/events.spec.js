import sinon from 'sinon';
import { Observable } from 'utils/events';

const sandbox = sinon.sandbox.create();

describe('Events utils', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('Observable', () => {
        it('should register and trigger events', () => {
            let firstHandler = sandbox.spy();
            let secondHandler = sandbox.spy();
            let thirdHandler = sandbox.spy();

            let observable = new Observable();

            observable.on('1', firstHandler);
            observable.on('1', secondHandler);
            observable.on('2', thirdHandler);
            observable.trigger('1');

            firstHandler.should.have.been.calledOnce;
            secondHandler.should.have.been.calledOnce;
            thirdHandler.should.not.have.been.called;

            firstHandler.reset();
            secondHandler.reset();
            thirdHandler.reset();

            observable.trigger('2');
            firstHandler.should.not.have.been.called;
            secondHandler.should.not.have.been.called;
            thirdHandler.should.have.been.calledOnce;

            firstHandler.reset();
            secondHandler.reset();
            thirdHandler.reset();

            observable.off('1', firstHandler);
            observable.trigger('1');

            firstHandler.should.not.have.been.called;
            secondHandler.should.have.been.calledOnce;
            thirdHandler.should.not.have.been.called;

        });
    });
});
