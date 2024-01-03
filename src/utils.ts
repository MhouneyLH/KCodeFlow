// randomly generates a praising word based on an array of praising words
export function getPraisingWord(): string {
  const WORDS = ["Awesome", "Wonderful", "Great", "Fantastic", "Cool"];
  const randomNumber: number = Math.floor(Math.random() * WORDS.length);

  return WORDS[randomNumber];
}

// makes it possible to use the setInterval()-method
// for a longer interval than 2^31 - 1 (= 2147483647) seconds
// when using the normal setInterval()-method, than just 0 is used as value,
// if value is greater 2^31 - 1
export function setLongInterval(callback: any, timeout: number): any {
  let count = 0;
  const MAX_32_BIT_SIGNED = 2147483647;
  const maxIterations = timeout / MAX_32_BIT_SIGNED;

  const onInterval = () => {
    count++;
    if (count > maxIterations) {
      count = 0;
      callback();
    }
  };

  return setInterval(onInterval, Math.min(timeout, MAX_32_BIT_SIGNED));
}
