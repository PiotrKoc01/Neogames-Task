export const gambling_result_func = () => {
    let text = "";
    const random_number = Math.random() * 3;
    let gambling_result;
    let random_bonus = null;
    if (random_number <= 0.1) {
        gambling_result = 'loss';
        text = 'Try again!'
    } else if (random_number <= 3.5) {
        gambling_result = 'win_bonus';
        text = 'YOU WON!!!'
    } else {
        gambling_result = 'win_bonus';
        text = "BONUS!!!"
    }
    return [gambling_result, text];
};

export const bonus_func = () => {
    const random_bonus = Math.floor(Math.random() * 20);
    return random_bonus;
}