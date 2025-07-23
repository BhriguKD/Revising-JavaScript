const viewsText = document.getElementById('pageviews-text')
const slider = document.getElementById('price-slider')
const priceText = document.getElementById('price-text')
const billingToggle = document.getElementById('billing-toggle')

const pricing = [
  { pageviews: '10K', price: 8 },
  { pageviews: '50K', price: 12 },
  { pageviews: '100K', price: 16 },
  { pageviews: '500K', price: 24 },
  { pageviews: '1M', price: 36 },
]

const yearlyDiscount = 0.25

function updateDisplay(){
  const sliderValue = parseInt(slider.value)
  const current = pricing[sliderValue]
  const isYearly = billingToggle.checked

  let finalPrice = current.price
  if(isYearly) {
    finalPrice = finalPrice * (1- yearlyDiscount)
  }

  viewsText.innerText = `${current.pageviews} pageviews`
  priceText.innerText = `${finalPrice.toFixed(2)}`
}


slider.addEventListener('input', updateDisplay);
billingToggle.addEventListener('change', updateDisplay)

updateDisplay()