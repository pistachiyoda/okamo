const DeleteItemAllIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'DeleteItemAllIntent';
    },
    async handle(handlerInput) {
        handlerInput.attributesManager.setPersistentAttributes({'itemList': [] });
        await handlerInput.attributesManager.savePersistentAttributes();

        const speechText = 'メモがリセットされました';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Delete All Item', speechText)
            .reprompt('ほかになにをしますか？') 
            .getResponse();
    },
};

module.exports = DeleteItemAllIntentHandler;