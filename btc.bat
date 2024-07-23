set time2=%time: =0%
set ymd=%date:~0,4%%date:~5,2%%date:~8,2%_%time2:~0,2%%time2:~3,2%%time2:~6,2%
echo %ymd%

node btc_opt4.js