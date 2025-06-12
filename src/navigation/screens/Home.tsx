import { Button, Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { DraxList, DraxListItem, DraxProvider } from "react-native-drax";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

interface Product {
  id: number;
  name: string;
}

const generateProducts = (size: number): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < size; i++) {
    products.push({ id: Math.random(), name: `P ${i}` });
  }
  return products;
};

export const ProductCard = (props: { text: string }) => {
  const { text } = props;
  return (
    <View>
      <Text style={{ fontSize: 48 }}>{text}</Text>
    </View>
  );
};

export type HomeProps = StaticScreenProps<{ twoColumn: boolean }>;

export function Home(props: HomeProps) {
  const { route } = props;
  const { params } = route;
  const { twoColumn } = params;
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    setProducts(generateProducts(15));
  }, []);

  return (
    <GestureHandlerRootView>
      <DraxProvider>
        <DraxList
          data={products}
          numColumns={twoColumn ? 2 : undefined}
          renderItem={(info, itemProps) => (
            <DraxListItem
              style={{margin: 48}}
              itemProps={itemProps}
              draggingStyle={{ opacity: 0.3 }}
            >
              <ProductCard text={`${info.item.name}`} />
            </DraxListItem>
          )}
          onItemReorder={({ fromIndex, toIndex }) => {
            // Update your data here
            const newData = [...products];
            const item = newData.splice(fromIndex, 1)[0];
            newData.splice(toIndex, 0, item);
            setProducts(newData);
          }}
        />
      </DraxProvider>
    </GestureHandlerRootView>
    // <GestureHandlerRootView>
    //   <DraggableFlatList
    //     numColumns={twoColumn ? 2 : undefined}
    //     data={products}
    //     onDragEnd={({ data }) => setProducts(data)}
    //     renderItem={({ item, drag, isActive }) => (
    //       <TouchableOpacity
    //         onLongPress={drag}
    //         style={{
    //           margin: 48,
    //           borderWidth: isActive ? 2 : undefined,
    //           borderColor: isActive ? "red" : undefined,
    //         }}
    //       >
    //         <ProductCard text={`${item.name}`} />
    //       </TouchableOpacity>
    //     )}
    //     keyExtractor={(item) => `${item.id}`}
    //   />
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
