set time2=%time: =0%
set ymd=%date:~0,4%%date:~5,2%%date:~8,2%_%time2:~0,2%%time2:~3,2%%time2:~6,2%
set ymdh=%date:~0,4%_%date:~5,2%%date:~8,2%_%time2:~0,2%
set yyyy=%date:~0,4%

echo %ymd%

type cloud#*.csv > excel_%ymdh%.csv

rem 7za a  excel_%ymd%.zip local_%ymdh%.csv

rem del excel_%ymdh%.csv

cmd /k
