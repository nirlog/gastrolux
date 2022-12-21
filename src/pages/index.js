import 'normalize.css/normalize.css';
import 'jquery.scrollbar/jquery.scrollbar.css';
import 'jquery.scrollbar/jquery.scrollbar.min.js';
import './index.css';

const ESCAPE_KEY = 'Escape';
const arrayPopupDelivery = {
    popupElement: document.querySelector('#popup_delivery'),
    keyClose: ESCAPE_KEY
  }

class Popup {
    constructor(popup){
        this._popup = popup.popupElement;
        this._buttonClosePopup = this._popup.querySelector('.popup__close');
        this._popupContainer = this._popup.querySelector('.popup__container');
        this._keyClose = popup.keyClose;
        this.wrapperClickOverlay = (e) => this._clickOverlay.call(this, e);
        this.wrapperClickButtonClose = (e) => this._clickButtonClose.call(this, e);
        this.wrapperHandleEscClose = (e) => this._handleEscClose.call(this, e);
    }
  
    open(){
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this.wrapperHandleEscClose);
    }
  
    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this.wrapperHandleEscClose);
    }
  
    _handleEscClose(e){
        if(e.key === this._keyClose){
            this.close();
        }
    }
  
    _clickOverlay(e){
        if(e.target === this._popup){
            this.close();
        }
    }
  
    _clickButtonClose(e){
        if(e.target === this._buttonClosePopup){
            this.close();
        }
    }
  
    setEventListeners(){
        this._popup.addEventListener('mousedown', this.wrapperClickOverlay);
        this._popup.addEventListener('click', this.wrapperClickButtonClose);
    }
}

const popupDelivery = new Popup(arrayPopupDelivery);
popupDelivery.setEventListeners();
  
  
document.addEventListener("DOMContentLoaded", ready);
// выбор оплаты и доставки
function ready() {
    let paymentsBlock = document.querySelector('.stage__payments');
    let paymentSelect = document.querySelector('.stage__pay-select');
    let paymentBtns = Array.from(paymentsBlock.querySelectorAll('.pay-btn'));

    let deliveryBlock = document.querySelector('.choice-delivery');
    let deliverySelect = document.querySelector('.choice-delivery__select');
    let deliveryBtns = Array.from(deliveryBlock.querySelectorAll('.choice-delivery__btn'));
    let deliveryAddress = document.querySelector('.delivery-address');
    let deliveryFilter = document.querySelector('.delivery-filters');
    let deliveryLists = document.querySelector('.delivery-lists');

    let ckeckedPOrder = (currentBtn, select, btns) => {
        select.value = currentBtn.getAttribute('data-val');
        btns.forEach((btn) => {
            if(btn == currentBtn){
                if(!btn.classList.contains('active')){
                    btn.classList.add('active');
                }
            }else{
                if(btn.classList.contains('active')){
                    btn.classList.remove('active');
                }
            }
        });
    }

    if(paymentBtns && paymentSelect){
        paymentBtns.forEach((payBtn) => {
            payBtn.addEventListener('click', function(e){
                ckeckedPOrder(e.target, paymentSelect, paymentBtns);
            });
        });
    }

    if(deliveryBtns && deliverySelect){
        deliveryBtns.forEach((deliveryBtn) => {
            deliveryBtn.addEventListener('click', function(e){
                ckeckedPOrder(e.target, deliverySelect, deliveryBtns);
                if(e.target.classList.contains('js-delivery-courier')){
                    deliveryAddress.classList.add('active');
                    deliveryFilter.classList.remove('active');
                    deliveryLists.classList.remove('active');
                    popupDelivery.open();
                }
                if(e.target.classList.contains('js-delivery-poi')){
                    deliveryAddress.classList.remove('active');
                    deliveryFilter.classList.add('active');
                    deliveryLists.classList.add('active');
                }
            });
        });
    }





    let deliveryFiltersBtns = document.querySelector('.delivery-filters__btns');
    let deliveryMap = document.querySelector('.delivery-lists__map');
    let deliverySelectList = document.querySelector('.delivery-filters__select');
    let deliveryList = document.querySelector('.delivery-lists__list');
    let deliveryItem = Array.from(deliveryList.querySelectorAll('.delivery-item'));


    if(deliveryFiltersBtns){
        let btnList = deliveryFiltersBtns.querySelector('.btn-filter_list');
        let btnMap = deliveryFiltersBtns.querySelector('.btn-filter_map');
        btnList.addEventListener('click', function(){
            if(!btnList.classList.contains('active')){
                btnList.classList.add('active');
                deliveryList.classList.add('active');
                btnMap.classList.remove('active');
                deliveryMap.classList.remove('active');
            }
        });

        btnMap.addEventListener('click', function(){
            if(!btnMap.classList.contains('active')){
                btnMap.classList.add('active');
                deliveryMap.classList.add('active');
                btnList.classList.remove('active');
                deliveryList.classList.remove('active');
            }
        });
    }

    if(deliverySelectList && deliveryItem){
        deliveryItem.forEach((item) => {
        let itemBtn = item.querySelector('.delivery-item__btn');
        itemBtn.addEventListener('click', function(e){
            deliverySelectList.value = e.target.getAttribute('data-val');
        });
        });
    }

    const deliveryTable = document.querySelector('.delivery-table');
    const deliveryTableSelect = document.querySelector('#delivery-table__select');
    const deliveryTableItems = Array.from(deliveryTable.querySelectorAll('.delivery-table-item'));
    deliveryTableItems.forEach((deliveryTableItem) => {
        deliveryTableItem.addEventListener('click', function(){
            deliveryTableSelect.value = deliveryTableItem.getAttribute('data-val');
            deliveryTableItems.forEach((item)=> {
                if(item.classList.contains('active')){
                    item.classList.remove('active');
                }
            })
            deliveryTableItem.classList.add('active');
            popupDelivery.close();
        });
    });

    jQuery('.scrollbar-inner').scrollbar();
}


















