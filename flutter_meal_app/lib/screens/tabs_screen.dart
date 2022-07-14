import 'package:flutter/material.dart';

import './categories_screen.dart';
import './favorites_screen.dart';
class TabScreen extends StatefulWidget {
  const TabScreen({Key? key}) : super(key: key);

  @override
  TabScreenState createState() => TabScreenState();
}

class TabScreenState extends State<TabScreen> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            title: const Text('Meals'),
            bottom: const TabBar(tabs: [
              Tab(icon: Icon(Icons.category), text: 'Categories'),
              Tab(icon: Icon(Icons.star), text: 'Favorites')
            ]),
          ),
          body: const TabBarView(children: [
             CategoriesScreen(),
             FavoriteScreen()
          ]),
        ));
  }
}
