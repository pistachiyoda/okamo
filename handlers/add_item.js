const AddItemIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AddItemIntent';
    },
    async handle(handlerInput) {
        //追加するアイテムを取得。【AddItemIntent:{Product}をメモして】の{Product}を取得する。
        var item = handlerInput.requestEnvelope.request.intent.slots.Product.value;
        //handlerInput.attributesManager.getPersistentAttributes()でユーザーごとのDyanamoDBに入っているデータ
        //のPromiseが取得される。それをawaitするとデータ自体が取得できる。 = mapAttr
        
        var attributes = await handlerInput.attributesManager.getPersistentAttributes();

        //初期化処理。DynamoDBに【項目：itemList】がなかった場合は、{'itemList' : []}をデータ構造とする。
        if ( !attributes['itemList'] ) {
            attributes = {'itemList' : []};
            console.log('if');
        } 
        
        attributes['itemList'].push(item);

        handlerInput.attributesManager.setPersistentAttributes(attributes);
        await handlerInput.attributesManager.savePersistentAttributes();
        const speechText = item + 'が追加されました';
        console.log(handlerInput.requestEnvelope);
    
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

module.exports = AddItemIntentHandler;
