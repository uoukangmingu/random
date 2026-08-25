# Random Roulette Webapp

공용 참가자 명단과 기본 가중치 룰렛, 운 게임 7종, 피지컬 게임 5종을 제공하는 정적 웹앱이다.

## 실행

빌드는 `dist/app.js`, `dist/app.css`를 만들고 일반 정적 호스팅을 위한 `random-roulette.v3.6.js`, `random-roulette.v3.6.css`와 기존 호환 번들도 함께 만든다. `index.html`은 이전 서비스 워커 캐시에 막히지 않는 버전 파일을 불러온다. PWA와 서비스 워커 검증을 위해 파일을 직접 여는 대신 로컬 서버를 사용한다.

```bash
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173`을 연다.

## 빌드와 검사

Node.js만으로 빌드할 수 있으며 외부 번들러가 필요하지 않다.

```bash
npm run build
npm run check
```

- `npm run split`: 기존 게임 소스를 `src/games/`의 게임별 모듈로 다시 분리
- `npm run dev`: 실제 브라우저 점검용 개발 서버 실행
- `npm run build`: 공용 모듈과 게임 모듈을 안전한 경계로 결합해 `dist/`, 버전 배포본과 호환 번들을 함께 생성
- `npm run check`: JavaScript 문법, 중복 함수, 필수 파일·HTML ID·기능 마커 검사
- `npm run icons`: PWA PNG 아이콘 재생성(Pillow 필요)

원본 `script.js`나 모듈을 수정한 뒤에는 반드시 `npm run build`를 실행한다. `random-roulette.v3.6.*`, `app.bundle.*`, `script.min.js`, `style.min.css`는 `dist`와 동일한 자동 생성 배포본이므로 직접 수정하지 않는다. 음량 슬라이더의 퍼센트와 채움 색상은 `volume-controls.js`에서도 독립적으로 동기화한다.

시작 버튼은 중간 분류 메뉴 없이 `랜덤 게임 목록`으로 바로 이동한다. 목록은 랜덤 게임 뽑기, 기본 룰렛, 7개 운 게임, 5개 피지컬 게임을 한 화면에 표시하며 모든 카드 우측 상단에 빨리감기 가능 여부를 표시한다.

게임 목록은 현재 명단으로 실행 가능한 카드를 먼저 보여주고, 실행 불가 카드는 중앙 안내를 표시한 채 목록 뒤로 정렬한다. PC에서는 모바일 전용 게임을 숨기고, 모바일에서는 키보드가 필요한 PC 전용 게임을 숨긴다. 목록 상단의 `참가자 명단 수정` 버튼으로 바로 인원을 조정할 수 있다.

## 새 구조

```text
src/
  shared/
    rng.js                 결과용 난수와 seed
    game-engine.js         결과 계산·고정 시간축
    roster.js              공용 참가자 명단
    session-guard.js       진행 중 이동·리셋 확인
    pwa.js                 서비스 워커·화면 꺼짐 방지
  games/
    wheel.js               기본 가중치 룰렛
    registry.js            인원·기기별 실행 가능 판정
    game1-drop.js          담아라!
    game2-race.js          경마
    game3-card-battle.js   카드 연산 배틀
    game4-ball-battle.js   볼 배틀
    game5-russian-roulette.js
    game6-stock.js
    game7-ladder.js
    physical-games.js
```

## 주요 기능

- 기본 원판 룰렛: `항목 | 가중치`, 재추첨, 당첨 항목 제거, 자동 제거, 최근 50개 기록
- 공용 참가자 명단: 한 번 저장하면 모든 기존 게임 입력 형식에 자동 반영
- 스마트 랜덤 게임: 현재 인원수와 기기에서 실행 가능한 운 게임만 선택
- 진행 보호: 게임이 진행 중일 때만 화면 이동·리셋 확인 대화상자 표시
- 계산·렌더링 분리: 주식게임은 모든 기기에서 250ms 고정 계산, 화면 갱신만 성능 등급별 조절
- 동일 물리 규칙: 담아라! 구슬 수와 물리 시간축을 기기와 무관하게 통일
- PWA: 오프라인 핵심 화면, 홈 화면 설치, 실행 중 Screen Wake Lock
- 이모지 폴백: 캔버스로 미지원 글리프를 감지하고 대체 이모지·기호로 자동 교체

## 참고

- 참가자 명단과 룰렛 기록은 서버로 전송되지 않고 해당 브라우저의 `localStorage`에만 저장된다.
- 화면 꺼짐 방지는 지원 브라우저와 보안 연결(HTTPS)에서만 활성화된다.
- 곰찾기 영상은 사용자가 상자를 열 때 로딩하며, 모바일에서는 별도 경량 영상을 사용한다.
