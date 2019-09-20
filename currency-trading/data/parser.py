import csv
import json

f = open( './currencies.csv', 'rU' )
reader = csv.DictReader( f, fieldnames = ( "symbol","name" ))
out = json.dumps( [ row for row in reader ] )
print "JSON parsed!"
f = open( '../src/currencies/parsed.json', 'w')
f.write(out)
