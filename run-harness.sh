#!/bin/bash
# harness 테스트 스크립트
# Agent 1·2·3 병렬 실행 → 완료 후 Agent 4 실행

PROJECT="/home/cakepower/tutorial/a14u"
SESSION="harness"

# 기존 세션 있으면 삭제
tmux kill-session -t $SESSION 2>/dev/null

# 새 세션 생성 (Agent 1)
tmux new-session -d -s $SESSION -x 220 -y 50

# 레이아웃: 위 3칸 / 아래 1칸
tmux split-window -h -t $SESSION     # 좌/우 분할
tmux split-window -h -t $SESSION:0.1 # 우측을 다시 분할 → 3칸
tmux select-layout -t $SESSION even-horizontal

tmux split-window -v -t $SESSION:0.0 # 아래 pane (Agent 4 대기)
tmux split-window -v -t $SESSION:0.1
tmux split-window -v -t $SESSION:0.2

# ── 위쪽 3칸: Agent 1·2·3 실행 ──────────────────────────
tmux send-keys -t $SESSION:0.0 \
  "echo '[Agent 1] 이벤트 모니터 시작...' && cd $PROJECT && claude --print \"이벤트 모니터 실행해줘\" 2>&1 | tee logs/event-monitor.log && echo '[Agent 1] 완료'" Enter

tmux send-keys -t $SESSION:0.1 \
  "echo '[Agent 2] 이벤트 캘린더 업데이트 시작...' && cd $PROJECT && claude --print \"이벤트 캘린더 업데이트해줘\" 2>&1 | tee logs/event-calendar.log && echo '[Agent 2] 완료'" Enter

tmux send-keys -t $SESSION:0.2 \
  "echo '[Agent 3] Airbnb 리서치 시작...' && cd $PROJECT && claude --print \"에어비앤비 리서치 해줘\" 2>&1 | tee logs/airbnb-research.log && echo '[Agent 3] 완료 → Agent 4 실행 가능'" Enter

# ── 아래 3칸: Agent 4 대기 안내 ─────────────────────────
tmux send-keys -t $SESSION:0.3 \
  "echo '[Agent 4] Agent 3 완료 후 아래 명령어를 직접 실행하세요:' && echo '' && echo \"  cd $PROJECT && claude --print \\\"가격 전략 수립해줘\\\" 2>&1 | tee logs/pricing-strategy.log\"" Enter

tmux send-keys -t $SESSION:0.4 "echo '[로그] tail -f logs/airbnb-research.log'" Enter
tmux send-keys -t $SESSION:0.5 "echo '[로그] tail -f logs/event-monitor.log'" Enter

# 세션 연결
tmux attach-session -t $SESSION
