const PRIMES = calculatePrimes(1_000_000);

let resultPut = false;

function handleKeydownEvent(event) {
    if (event.key === "Enter") {
        calculateAndPutPrimeFactorsString();
    }
}

function handleInputEvent(event) {
    if (event.target.value === "") return;
    if (parseInt(event.target.value) === 0) {
        event.target.value = "";
        return;
    }
    event.target.value = event.target.value.replace(/\D/g, "");
    if (event.target.value.length >= 1) {
        event.target.value = Number(event.target.value).toLocaleString();
    }
}

function canonicalCheckboxChanged() {
    if (resultPut) {
        calculateAndPutPrimeFactorsString();
    }
}

function calculateAndPutPrimeFactorsString() {
    const input = document.getElementById("number-input").value;
    const canonical = document.getElementById("canonical-checkbox").checked;
    const result = calculatePrimeFactorsString(input, canonical);
    // console.log(result);
    document.getElementById("result-paragraph").innerHTML = result;
}

function calculatePrimeFactorsString(input, canonical) {
    num = parseInt(input.replace(/\D/g, ""));
    if (isNaN(num) || num < 1) {
        resultPut = false;
        return "Bitte gib eine positive Ganzzahl ein.";
    }
    if (num == 1) {
        resultPut = false;
        return "Die Zahl 1 ist weder eine Primzahl noch eine zusammengesetzte Zahl.";
    }
    const primeFactors = calculatePrimeFactors(num);
    if (canonical) {
        const primeFactorsObject = toPrimeFactorsObject(primeFactors);
        resultPut = true;
        return input + " = " + Object.entries(primeFactorsObject).map(([b, x]) => x === 1 ? septh(b) : `${septh(b)}<sup>${x}</sup>`).join(" &times; ");
    } else {
        resultPut = true;
        return input + " = " + primeFactors.map(b => b.toLocaleString()).join(" &times; ");
    }
}

function calculatePrimeFactors(num) {
    const primeFactors = [];
    for (const prime of PRIMES) {
        if (prime * prime > num) break;
        while (num % prime === 0) {
            primeFactors.push(prime);
            num /= prime;
        }
    }
    if (num > 1)
        primeFactors.push(num);
    return primeFactors;
}

function toPrimeFactorsObject(primeFactors) {
    const factorCount = primeFactors.reduce((countMap, factor) => {
        countMap[factor] = (countMap[factor] || 0) + 1;
        return countMap;
    }, {});
    return factorCount;
}

function calculatePrimes(limit) {
    const primes = [2];
    for (let i = 3; i <= limit; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function septh(string) {
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}