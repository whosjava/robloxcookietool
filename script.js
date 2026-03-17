// DOM Elements
const inputText = document.getElementById('inputText');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const result = document.getElementById('result');
const noCookie = document.getElementById('noCookie');
const cookieValue = document.getElementById('cookieValue');

let foundCookie = null;

// Roblox cookie pattern
// Format: _|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
const COOKIE_REGEX = /_\|WARNING:-DO-NOT-SHARE-THIS\.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items\.\|_[A-F0-9]{700,}/i;

// Alternative shorter pattern (for older cookies)
const SHORT_COOKIE_REGEX = /_\|WARNING:-DO-NOT-SHARE-THIS[^|]*\|_[A-Za-z0-9+/=_-]{200,}/;

// Auto-detect on input
inputText.addEventListener('input', () => {
    const text = inputText.value;
    
    if (text.trim() === '') {
        result.classList.add('hidden');
        noCookie.classList.add('hidden');
        return;
    }
    
    findCookie(text);
});

// Clear button
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    result.classList.add('hidden');
    noCookie.classList.add('hidden');
    foundCookie = null;
});

// Copy button
copyBtn.addEventListener('click', () => {
    if (foundCookie) {
        navigator.clipboard.writeText(foundCookie).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ Copied!';
            copyBtn.style.background = '#48bb78';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '';
            }, 2000);
        });
    }
});

// Find cookie function
function findCookie(text) {
    // Try main pattern
    let match = text.match(COOKIE_REGEX);
    
    // Try alternative pattern
    if (!match) {
        match = text.match(SHORT_COOKIE_REGEX);
    }
    
    if (match) {
        foundCookie = match[0];
        cookieValue.textContent = foundCookie;
        result.classList.remove('hidden');
        noCookie.classList.add('hidden');
    } else {
        result.classList.add('hidden');
        noCookie.classList.remove('hidden');
        foundCookie = null;
    }
}

// Auto-focus on load
window.addEventListener('load', () => {
    inputText.focus();
});

// Paste event for extra detection
inputText.addEventListener('paste', (e) => {
    setTimeout(() => {
        findCookie(inputText.value);
    }, 50);
});
