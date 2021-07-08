import React from "react";
import { View ,Dimensions} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const {width}=Dimensions.get('window')
export default  Skeleton = () => {
  return (
      <>
      <View style={{height:115}}>
      <SkeletonPlaceholder backgroundColor={'#ededed'} highlightColor={'#ffd6d6'}>
      <View style={{alignItems: "center" }}>
        <View>
          <View style={{ width: width-50, height: 25, borderRadius: 4,marginTop:5}} />
          <View style={{ width: width-50, height: 25, borderRadius: 4,marginTop:5}} />
          <View style={{ width: width-50, height: 25, borderRadius: 4,marginTop:5}} />
        </View>
      </View>
    </SkeletonPlaceholder>

    </View>
    <View style={{height:115}}>
      <SkeletonPlaceholder backgroundColor={'#ededed'} highlightColor={'#ffd6d6'}>
      <View style={{alignItems: "center" }}>
        <View>
          <View style={{ width: width-50, height: 25, borderRadius: 4,marginTop:5}} />
          <View style={{ width: width-50, height: 25, borderRadius: 4,marginTop:5}} />
          <View style={{ width: width-50, height: 25, borderRadius: 4,marginTop:5}} />
        </View>
      </View>
    </SkeletonPlaceholder>

    </View>
    <View style={{height:115}}>
      <SkeletonPlaceholder backgroundColor={'#ededed'} highlightColor={'#ffd6d6'}>
      <View style={{alignItems: "center" }}>
        <View>
          <View style={{ width: width-50, height: 25, borderRadius: 4,marginTop:5}} />
          <View style={{ width: width-50, height: 25, borderRadius: 4,marginTop:5}} />
          <View style={{ width: width-50, height: 25, borderRadius: 4,marginTop:5}} />
        </View>
      </View>
    </SkeletonPlaceholder>

    </View>
    </>
  );
};