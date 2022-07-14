import 'package:flutter/material.dart';

import '../screens/filter_screen.dart';

class MainDrawer extends StatelessWidget {
  const MainDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Drawer(
            child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
            color: Colors.amber,
            height: 120,
            width: double.infinity,
            child: const Center(
              child: Text(
                'Cooking Up!',
                style: TextStyle(fontSize: 40, fontWeight: FontWeight.w900),
              ),
            )),
        ListTile(
            onTap: () => Navigator.of(context).pushReplacementNamed('/'),
            leading: const Icon(Icons.restaurant, size: 26),
            title: const Text(
              'Meals',
              style: TextStyle(
                  fontFamily: 'RobotoCondensed',
                  fontSize: 24,
                  fontWeight: FontWeight.bold),
            )),
        ListTile(
            onTap: () => Navigator.of(context).pushReplacementNamed(FilterScreen.routeName),
            leading: const Icon(Icons.settings, size: 26),
            title: const Text(
              'Filters',
              style: TextStyle(
                  fontFamily: 'RobotoCondensed',
                  fontSize: 24,
                  fontWeight: FontWeight.bold),
            )),
      ],
    )));
  }
}
