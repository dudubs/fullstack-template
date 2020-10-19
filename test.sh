
./node.sh \
   node_modules/jasmine/bin/jasmine.js \
    $(find $1 -type f -path '*/tests/*' -name '*.ts*' \
      ! -path '*/node_modules/*' ) \
    --stop-on-failure=true $JASMINE_OPTIONS
