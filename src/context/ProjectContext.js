"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
const defaultProject = {
  stage: "UPLOAD",
  roomImage: null,
  detectedObjects: [],
  designDNA: null,
  zones: [],
  budget: null,
  mode: null,
  selectedProducts: [],
  bids: []
};
const ProjectContext = createContext(null);
export const useProject = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be used within ProjectProvider");
  return ctx;
};
export const ProjectProvider = ({
  children
}) => {
  const [project, setProject] = useState(defaultProject);
  const setStage = useCallback(stage => {
    setProject(p => ({
      ...p,
      stage
    }));
  }, []);
  const setRoomImage = useCallback(roomImage => {
    setProject(p => ({
      ...p,
      roomImage
    }));
  }, []);
  const setDetectedObjects = useCallback(detectedObjects => {
    setProject(p => ({
      ...p,
      detectedObjects
    }));
  }, []);
  const setDesignDNA = useCallback(designDNA => {
    setProject(p => ({
      ...p,
      designDNA
    }));
  }, []);
  const setZones = useCallback(zones => {
    setProject(p => ({
      ...p,
      zones,
      budget: zones.reduce((s, z) => s + z.budget, 0)
    }));
  }, []);
  const setMode = useCallback(mode => {
    setProject(p => ({
      ...p,
      mode
    }));
  }, []);
  const addSelectedProduct = useCallback(product => {
    setProject(p => ({
      ...p,
      selectedProducts: [...p.selectedProducts.filter(sp => sp.zone !== product.zone), product]
    }));
  }, []);
  const removeSelectedProduct = useCallback(id => {
    setProject(p => ({
      ...p,
      selectedProducts: p.selectedProducts.filter(sp => sp.id !== id)
    }));
  }, []);
  const setBids = useCallback(bids => {
    setProject(p => ({
      ...p,
      bids
    }));
  }, []);
  const selectBid = useCallback(bid => {
    setProject(p => ({
      ...p,
      selectedProducts: [...p.selectedProducts, {
        id: bid.productId,
        name: bid.product,
        price: bid.price,
        image: "",
        zone: "bed",
        vendor: bid.vendor,
        score: bid.score
      }]
    }));
  }, []);
  return <ProjectContext.Provider value={{
    project,
    setStage,
    setRoomImage,
    setDetectedObjects,
    setDesignDNA,
    setZones,
    setMode,
    addSelectedProduct,
    removeSelectedProduct,
    setBids,
    selectBid
  }}>
      {children}
    </ProjectContext.Provider>;
};