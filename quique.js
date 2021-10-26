let widget;
const startBot = () => {
    widget = new BlipChat()
        .withAppKey('{YOUR_TOKEN_HERE}')
        .withButton({ "color": "#2CC3D5", "icon": "" })
        .withCustomCommonUrl('https://take.chat.blip.ai/')
        .build();
        const blipChatOpenIframe = document.querySelector('#blip-chat-open-iframe');
        blipChatOpenIframe.classList.add('bounce-7')
};

window.onload = startBot;
