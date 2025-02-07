import parse from 'html-react-parser';
import translate from '@iamtraction/google-translate';

export const translateText = async function(text, targetLanguage) {
    console.log("Before text:", text, "Target language:", targetLanguage);

    const parsedText = parse(text);  
    const plainText = getPlainText(parsedText);
    console.log("Parsed:", parsedText);
    console.log("Plaintext:", plainText);

    try {
        const res = await translate(plainText, { to: targetLanguage });
        console.log("Translated text:", res.text);
        return res.text;  // Return the translated text
    } catch (err) {
        console.error("Translation Error:", err);
        return null; // Handle errors gracefully
    }
};

function getPlainText(parsedContent) {
    let plainText = '';
    
    if (Array.isArray(parsedContent)) {
        parsedContent.forEach(item => {
            if (typeof item === 'string') {
                plainText += item; 
            } else if (item.props && item.props.children) {
                plainText += getPlainText(item.props.children); 
            }
        });
    } else if (typeof parsedContent === 'string') {
        plainText = parsedContent; 
    } else if (parsedContent.props && parsedContent.props.children) {
        plainText = getPlainText(parsedContent.props.children); 
    }

    return plainText;
}

export default translateText;