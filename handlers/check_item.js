const CheckItemIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'CheckItemIntent';
    },
    async handle(handlerInput) {
        const attributes = await handlerInput.attributesManager.getPersistentAttributes();
        const itemList = attributes.itemList;
        //Array.prototype.map()
        //https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        //Array.prototype.join()
        //https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/join
        const itemNames = itemList.map(item => item.name).join(',');
        const speechText = itemNames + 'がメモされています';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

module.exports = CheckItemIntentHandler;