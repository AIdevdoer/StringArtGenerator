# Setup

## Requirements
- Node.js ≥ 16
- Go ≥ 1.19

## Installation
```bash
npm install
# Go dependencies
if [ ! -f go.mod ]; then
  go mod init stringart
fi
go get github.com/antha-lang/antha/antha/anthalib/num
```

## Run
### Start development server
```bash
npm run serve
# or
make serve
```
The site will be available at http://localhost:8080.

### Run Go algorithm
```bash
npm run go:run
# or
make go
```

## Common issues
| Error | Solution |
|-------|----------|
| `no required module provides package github.com/antha-lang/antha/antha/anthalib/num` | Initialize module with `go mod init stringart` and fetch dependency with `go get github.com/antha-lang/antha/antha/anthalib/num`. |
| `http-server: command not found` | Ensure dependencies are installed via `npm install`. |

## npm scripts
- `npm run serve`: start a static server using `http-server` on port 8080.
- `npm run go:run`: execute `main.go`.
