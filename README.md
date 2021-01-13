# neloApp

A bit on how the code works:

My database consist of the following tables:
Person(it consist of person's name, persons id9which is unique), persons x co-ordinate, persons y co-ordinate)

Persons_details(a unique key for this table, persons_id(acting as a foreign key over here), preferences)

Restaurant(restarant name, restaurant_id(primary key), location_x, location_y)

Restaurant_details(id(primary key),restaurant_id(acting as a foreign key), preferences,Start,end,no_of_two,no_of_four,no_of_six)

Restaurant_relation(id(primary key), persons id, start, end, restaurant_id, relation_id)

For every group, a unique relation_id is assigned differentiating that order from other groups.

It is assumed this unique id is stored at the clients place using a cookie as long as the reservation is valid.

When the client wants to cancel the reservation, the id gets send along with it to delete the reservation.

Work flow:
Initially it checks if any of the members involved have a reservation in the past 2 hours or future 2 hours.

If there is a conflict the code stops there itself.

If not it will run 3 sql queries:

1st-it will remove all the preferences of the group.

2nd-it will remove the list of restaurants that have a table free at that time.

3rd-it will remove the average x and y co ordinate of the group

then the result of 1st and 2nd is used to filter out those restaurants which meet the dietry criteria of the customers.

Then we find the restaurant which is closet to all the group of people.

Thats the output.

Things not implemented:

could not implement server to remove the reservation automatically after 2 hours.

