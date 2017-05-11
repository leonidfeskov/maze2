let popupOverlay = document.querySelector('.js-popup-overlay');
let popupRules = document.querySelector('.js-popup-rules');
let popupLoss = document.querySelector('.js-popup-loss');
let popupWin = document.querySelector('.js-popup-win');
let popupKeys = document.querySelector('.js-popup-keys');


popupRules.querySelector('.js-popup-close').addEventListener('click', function(){
	popupOverlay.style.display = 'none';
	popupRules.style.display = 'none';
});

popupLoss.querySelector('.js-popup-close').addEventListener('click', function(){
	window.location.reload();
});

popupWin.querySelector('.js-popup-close').addEventListener('click', function(){
	window.location.reload();
});

popupKeys.querySelector('.js-popup-close').addEventListener('click', function(){
	popupOverlay.style.display = 'none';
	popupKeys.style.display = 'none';
});

export const showPopupLoss = () => {
	popupOverlay.style.display = 'block';
	popupLoss.style.display = 'block';
}

export const showPopupWin = () => {
	popupOverlay.style.display = 'block';
	popupWin.style.display = 'block';
}

export const showPopupKeys = () => {
	popupOverlay.style.display = 'block';
	popupKeys.style.display = 'block';
}