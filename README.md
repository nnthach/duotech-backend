# Node.js service — Duotech architecture

Scaffold bằng `npx duotech nodejs`. Phân tầng chuẩn Duotech (xem `CLAUDE.md`).

## Bắt đầu

```bash
npm install
cp .env.example .env     # điền giá trị thật
npm run dev              # tsx watch, http://localhost:3000
curl http://localhost:3000/health   # {"status":"ok"}
```

## Lệnh

```bash
npm run dev          # dev server (watch)
npm run build        # tsc -> dist/
npm start            # chạy bản build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm test             # vitest
```

## Kiến trúc (phân tầng)

```text
src/
├── index.ts          # bootstrap: khởi tạo server
├── app.ts            # tạo express app + đăng ký middleware/route
├── routes/           # định nghĩa endpoint -> controller
├── controllers/      # nhận request -> gọi service -> trả response (mỏng)
├── services/         # business logic thuần (test được, không biết HTTP)
├── repositories/     # truy cập DB / external store
├── middlewares/      # error handler, not-found, auth, log
├── validations/      # Zod schema cho input
├── lib/              # logger, client bên thứ 3
├── types/            # type/interface dùng chung
└── config/           # env.ts (Zod-validated), constants.ts
```

Luồng request: `routes → controllers → services → repositories`.
Logic nghiệp vụ KHÔNG nằm trong controller. Chi tiết: đọc `CLAUDE.md`.
