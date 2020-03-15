class Saved {
    constructor(title, paragraph, other, symbol) {
        this.title = title;
        this.paragraph = paragraph;
        this.other = other;
        this.symbol = symbol;
    }

    setTitle(name) {
        this.title.textContent = name + ', у вас ' + localStorage.getItem('articles') + ' сохраненных статей';
    }

    setKeywords(keywords) {
        let word = 0;
        let count = 0;
        const results = [];
        let repeatElement = false;
        const resultKeywords = keywords.reduce(function (prevVal, item) {
            if (!prevVal[item]) {
                prevVal[item] = 1;
            } else {
                prevVal[item] += 1;
            }
            return prevVal;
        }, {});

        for (let i = 0; i < keywords.length; i++) {
            for (let item in resultKeywords) {
                if (resultKeywords[item] > count) {
                    word = item;
                    count = resultKeywords[item];
                }
            }
            repeatElement = results.some(element => {
                return element === word;
            });

            if (!repeatElement) {
                results.push(word);
            }
            delete resultKeywords[word];
            count = 0;
        }
        
        if (results.length < 4) {
            this.paragraph.textContent = '';
            results.forEach((element) => {
                this.paragraph.textContent += element + ', ';
            })
            const text = this.paragraph.textContent;
            this.paragraph.textContent = text.substr(0, (text.length - 2));
            this.other.textContent = '';
            this.symbol.textContent = '';
        } else {
            this.paragraph.textContent = '';
            this.paragraph.textContent = results[0] + ', ' + results[1];
            this.symbol.textContent = 'и';
            this.other.textContent = results.length - 2 + ' другим';
        }
    }
}

export default Saved;