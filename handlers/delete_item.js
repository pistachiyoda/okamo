const DeleteItemIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'DeleteItemIntent';
    },
    async handle(handlerInput) {
        var itemName = handlerInput.requestEnvelope.request.intent.slots.Product.value;
        const attributes = await handlerInput.attributesManager.getPersistentAttributes();
        console.log(attributes);
        //itemListにはこんな感じでアイテムオブジェクトの配列が入っている。[ { name: '牛乳' }, { name: 'コーヒー' } ] 
        const itemList = attributes.itemList;

        //Array.prototype.filter()
        //https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        const newItemList = itemList.filter(item => item.name !== itemName);

        handlerInput.attributesManager.setPersistentAttributes({'itemList': newItemList});
        await handlerInput.attributesManager.savePersistentAttributes();

        const speechText = itemName + 'が削除されました';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Delete Item', speechText)
            .getResponse();
    },
};

module.exports = DeleteItemIntentHandler;