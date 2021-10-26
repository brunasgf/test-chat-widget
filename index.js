const WIDGET_CUSTOM_COMMON_URL = 'https://take.chat.blip.ai/';

const BLIP_CHAT_CONTAINER_ID_SELECTOR = '#blip-chat-container';
const MESSAGE_BUBBLE_CLASS_SELECTOR = 'message-bubble';

class BlipChatWidget {
    constructor(messages = [], messageDelay = 0, mainColor = '#3f7de8', secondaryColor = '#b3d4ff') {
        this.messages = messages;
        this.messageDelay = messageDelay;
        this.mainColor = mainColor;
        this.secondaryColor = secondaryColor;
        this.init();
    }

    init() {
        this.setUpCustomCss();
        this.mount();
        this.addMessageBubbleIfAny();
    }

    mount() {
        this.widget = new BlipChat();
        this.widget
            .withAppKey(
                '{{YOUR_KEY_HERE}}'
            )
            .withButton({ color: this.mainColor, icon: '' })
            .withCustomMessageMetadata({ pageOrigin: window.location.href })
            .withCustomCommonUrl(WIDGET_CUSTOM_COMMON_URL)
            .withCustomStyle(this.customStyle)
            .withEventHandler(BlipChat.ENTER_EVENT, () => {
                if (!!this.addMessageBubbleTimeout) {
                    clearTimeout(this.addMessageBubbleTimeout);
                }
            })
            .build();
        this.widgetElement = document.querySelector(BLIP_CHAT_CONTAINER_ID_SELECTOR);
    }

    setUpCustomCss() {
        this.customStyle = `
            #blip-chat-header,
            .blip-card .bubble.right,
            button.blip-chat-start,
            .send-button {
                background-color: ${this.mainColor} !important;
            }
            .blip-card .left li.pointer span,
            .blip-card .left .fixed-options li div,
            .blip-card .left span.next,
            .blip-card .left a.next {
                color: ${this.mainColor} !important;
            }
            .select .options li {
                color: ${this.mainColor} !important;
                background-color: ${this.secondaryColor} !important;
                border-color: ${this.mainColor} !important;
            }
        `;
    }

    addMessageBubbleIfAny() {
        if (!!this.messages && this.messages.length > 0) {
            this.addMessageBubbleTimeout = setTimeout(this.addMessageBubble.bind(this), this.messageDelay);
        }
    }

    addMessageBubble() {
        this.messageBubble = document.createElement('div');
        this.messageBubble.classList.add(MESSAGE_BUBBLE_CLASS_SELECTOR);
        this.messages.forEach(m => {
            const message = document.createElement('p');
            message.append(m);
            this.messageBubble.appendChild(message);
        });

        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        this.messageBubble.appendChild(closeButton);

        const removeBubble = (e) => {
            if (!!e) { e.stopPropagation(); }
            if (!!this.messageBubble) {
                this.messageBubble.remove();
                delete this.messageBubble;
            }
        };

        const removeBubbleAndStartChat = () => {
            this.widget.toogleChat();
            removeBubble();
        };

        this.messageBubble.addEventListener('click', removeBubbleAndStartChat.bind(this));
        this.widgetElement.addEventListener('click', removeBubble.bind(this));
        closeButton.addEventListener('click', removeBubble.bind(this));

        document.querySelector('body').appendChild(this.messageBubble);
    }
}

window.onload = () => new BlipChatWidget(['Quer atrair, atender e fidelizar seus clientes com Apple Business Chat?', 'Vamos conversar sobre isso!'], 3000);