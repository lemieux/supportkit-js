export function createMock(sinon) {
    var mock = {
        appUsers: {
            init: sinon.stub(),
            update: sinon.stub(),
            trackEvent: sinon.stub(),
            stripe: {
                createTransaction: sinon.stub()
            }
        },

        conversations: {
            sendMessage: sinon.stub(),
            get: sinon.stub()
        },

        stripe: {
            getAccount: sinon.stub()
        }
    };

    return mock;
}
