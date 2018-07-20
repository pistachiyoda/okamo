const DeleteItemAllIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'DeleteItemAllIntent';
    },
    async handle(handlerInput) {
        const attributes = await handlerInput.attributesManager.getPersistentAttributes();
        //itemListにはこんな感じでアイテムオブジェクトの配列が入っている。[ { name: '牛乳' }, { name: 'コーヒー' } ] 
        //0を代入してリセット
        var itemList = attributes.itemList;
        itemList = 0;
        handlerInput.attributesManager.setPersistentAttributes({'itemList': itemList});
        await handlerInput.attributesManager.savePersistentAttributes();

        const speechText = 'メモがリセットされました';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Delete All Item', speechText)
            .getResponse();
    },
};

module.exports = DeleteItemAllIntentHandler;