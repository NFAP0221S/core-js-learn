// 유저 공격 값
const ATTACK_VALUE = 10;
// 강한 공격 값
const STRONG_ATTACK_VALUE = 17;
// 몬스터 공격 값
const MONSTER_ATTACK_VALUE = 14;
// 체력 회복 값
const HEAL_VAlUE = 20;

const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STORNG_ATTACK = 'STRONG_ATTACK'; // MODE_STORNG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';


// 배틀 로그
let battleLog = [];
// 마지막 호출된 로그
let lastLoggedEntry;

function getMaxLifeValues() {
    // 초기 체력 입력 값
    const enteredValue = prompt('몬스터와 유저의 최대 채력을 설정합니다.', '100')
    // 선택한 max life
    let parsedValue = parseInt(enteredValue);

    // max life가 NaN이거나 0이랑 같거나 작을경우 초기 값 100으로 설정
    if (isNaN(parsedValue) || parsedValue <= 0) {
        throw { message: '입력한 값이 유효하지 않거나 숫자가 아닙니다.'}
        parsedValue = 100;
    }
    return parsedValue;
}

let chosenMaxLife;
try {
    chosenMaxLife = getMaxLifeValues();
} catch (error) {
    console.log(error);
    chosenMaxLife = 100;
    alert('입력한 값이 유효하지 않기 때문에, 기본 값 100으로 적용되었습니다.')
    // throw error;
} 
// finally는 try - catch에서 catch 스코프에서 에러가 났을 경우 클린업을 하기위한 코드
// finally {

// }


// 현재 몬스터 체력
let currentMonsterHealth = chosenMaxLife;
// 현재 플레이어 체력
let currentPlayerHealth = chosenMaxLife;
// 보너스 생명
let hasBounsLife = true;

// 유저 체력 바
adjustHealthBars(chosenMaxLife);

function writeToLog(e, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: e,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };

    switch (e) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event: e,
                value: val,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: e,
                value: val,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry = {
                event: e,
                value: val,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: e,
                value: val,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        default:
            logEntry = {};
    }
    
    battleLog.push(logEntry);
}

// 게임 리셋
function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

// 몬스터 공격 셋업
function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBounsLife) {
        hasBounsLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('당신은 보너스 생명이 있습니다!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('승리!');
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('패배ㅠ');
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('무승부..');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'A DRAW',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        reset();
    }
}

// 기본 공격 셋업
function attackMonster(mode) {
    let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    let logEvent = 
        mode === MODE_ATTACK 
            ? LOG_EVENT_PLAYER_ATTACK 
            : LOG_EVENT_PLAYER_STRONG_ATTACK;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK
    // } else if (mode === MODE_STORNG_ATTACK) {
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    // }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    // 공격 후 몬스터가 공격
    endRound();
}

// 기본 공격
function attackHandler() {
    attackMonster(MODE_ATTACK);
}
// 강한 공격
function strongAttackHandler() {
    attackMonster(MODE_STORNG_ATTACK);
}
// 회복
function healPlayerHandler() {
    let healValue;

    // 현재 체력이 (MaxLife - 힐) 보다 같거나 크면
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VAlUE) {
        alert('체력을 회복할 수 없습니다.');
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VAlUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );

    // 회복 후 몬스터가 공격
    endRound();
}

// 로그 출력
function printLogHandler() {
    for (let i = 0; i < 3; i++) {
        console.log('----------')
    }
    
    let j = 0;
    outerWhile: do {
        console.log('Outer', j);
        innerFor: for (let k = 0; k < 5; k++) {
            if (k === 3) {
                // break outerWhile;
                continue outerWhile; // 무한루프
            }
            console.log('Inner', k);
        }
        j++;
    } while (j < 3);

    // 배열을 다룰때는 for - of
    let i = 0;
    for (const logEntry of battleLog) {
        if (!lastLoggedEntry && lastLoggedEntry !== 0 || lastLoggedEntry < i) {
            console.log(`#${i}`);
            // key : value 로 이루어진 객체를 다룰 때는 for - in
            for (const key in logEntry) {
                console.log(`${key} => ${logEntry[key]}`);
            }
            lastLoggedEntry = i;
            break;
        }
        i++;
    }
};

attackBtn.addEventListener('click', attackHandler); // 기본 공격 실행
strongAttackBtn.addEventListener('click', strongAttackHandler); // 강한 공격 실행
healBtn.addEventListener('click', healPlayerHandler); // 힐 실행
logBtn.addEventListener('click', printLogHandler); // 로그 출력 실행