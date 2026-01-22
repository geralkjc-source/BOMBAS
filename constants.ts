
import { EquipmentStatus, EquipmentGroup } from './types';

export const INITIAL_GROUPS: EquipmentGroup[] = [
  {
    name: "VACUUM PUMPS – PLANTA C",
    items: [
      { id: "vpc1", tag: "06C-VP-101", status: EquipmentStatus.STOPPED },
      { id: "vpc2", tag: "06C-VP-201", status: EquipmentStatus.STANDBY },
      { id: "vpc3", tag: "06C-VP-301", status: EquipmentStatus.STANDBY },
      { id: "vpc4", tag: "06C-VP-401", status: EquipmentStatus.STANDBY },
      { id: "vpc5", tag: "06C-VP-501", status: EquipmentStatus.STOPPED },
    ]
  },
  {
    name: "VACUUM PUMPS – PLANTA D",
    items: [
      { id: "vpd1", tag: "06D-VP-101", status: EquipmentStatus.RUNNING },
      { id: "vpd2", tag: "06D-VP-201", status: EquipmentStatus.RUNNING },
      { id: "vpd3", tag: "06D-VP-301", status: EquipmentStatus.ANOMALY, comment: "impacta na pressão" },
      { id: "vpd4", tag: "06D-VP-401", status: EquipmentStatus.RUNNING },
      { id: "vpd5", tag: "06D-VP-501", status: EquipmentStatus.ANOMALY, comment: "Vazamento na carcaça" },
    ]
  },
  {
    name: "FILTRATE PUMPS – PLANTA C",
    items: [
      { id: "fpc1", tag: "06C-PP-104", status: EquipmentStatus.STANDBY },
      { id: "fpc2", tag: "06C-PP-105", status: EquipmentStatus.STANDBY },
      { id: "fpc3", tag: "06C-PP-204", status: EquipmentStatus.STANDBY },
      { id: "fpc4", tag: "06C-PP-205", status: EquipmentStatus.STANDBY },
      { id: "fpc5", tag: "06C-PP-304", status: EquipmentStatus.STANDBY },
      { id: "fpc6", tag: "06C-PP-305", status: EquipmentStatus.STANDBY },
    ]
  },
  {
    name: "FILTRATE PUMPS – PLANTA D",
    items: [
      { id: "fpd1", tag: "06D-PP-104", status: EquipmentStatus.STANDBY },
      { id: "fpd2", tag: "06D-PP-105", status: EquipmentStatus.STANDBY },
      { id: "fpd3", tag: "06D-PP-204", status: EquipmentStatus.ANOMALY, comment: "TRIPPED" },
      { id: "fpd4", tag: "06D-PP-205", status: EquipmentStatus.RUNNING },
      { id: "fpd5", tag: "06D-PP-304", status: EquipmentStatus.RUNNING },
      { id: "fpd6", tag: "06D-PP-305", status: EquipmentStatus.RUNNING },
    ]
  },
  {
    name: "CLEAN WATER – PLANTA C",
    items: [
      { id: "cwc1", tag: "9C-PP-107", status: EquipmentStatus.STANDBY },
      { id: "cwc2", tag: "9C-PP-109", status: EquipmentStatus.STANDBY },
      { id: "cwc3", tag: "9C-PP-110", status: EquipmentStatus.RUNNING },
      { id: "cwc4", tag: "9C-PP-117", status: EquipmentStatus.STANDBY },
    ]
  },
  {
    name: "CLEAN WATER – PLANTA D",
    items: [
      { id: "cwd1", tag: "9D-PP-107", status: EquipmentStatus.RUNNING },
      { id: "cwd2", tag: "9D-PP-109", status: EquipmentStatus.RUNNING },
      { id: "cwd3", tag: "9D-PP-110", status: EquipmentStatus.STANDBY },
      { id: "cwd4", tag: "9D-PP-117", status: EquipmentStatus.RUNNING },
    ]
  },
  {
    name: "COLUMN WASH",
    items: [
      { id: "cw1", tag: "6C-PP-103", status: EquipmentStatus.STANDBY },
      { id: "cw2", tag: "6D-PP-103", status: EquipmentStatus.RUNNING },
    ]
  },
  {
    name: "FLOTATION FEED",
    items: [
      { id: "ff1", tag: "5C-PP-101", status: EquipmentStatus.RUNNING },
      { id: "ff2", tag: "5D-PP-101", status: EquipmentStatus.RUNNING },
    ]
  },
  {
    name: "CLOTH WASH",
    items: [
      { id: "clw1", tag: "6C-PP-201", status: EquipmentStatus.STANDBY },
      { id: "clw2", tag: "6D-PP-201", status: EquipmentStatus.RUNNING },
    ]
  },
  {
    name: "CONCENTRADO – PLANTA C",
    items: [
      { id: "cnc1", tag: "6C-PP-102", status: EquipmentStatus.STOPPED, comment: "Manutenção" },
      { id: "cnc2", tag: "6C-PP-202", status: EquipmentStatus.STANDBY },
      { id: "cnc3", tag: "6C-PP-302", status: EquipmentStatus.STANDBY },
    ]
  },
  {
    name: "CONCENTRADO – PLANTA D",
    items: [
      { id: "cnd1", tag: "6D-PP-201", status: EquipmentStatus.RUNNING },
      { id: "cnd2", tag: "6D-PP-202", status: EquipmentStatus.STOPPED, comment: "Manutenção" },
      { id: "cnd3", tag: "6D-PP-203", status: EquipmentStatus.RUNNING },
    ]
  },
  {
    name: "BOMBAS DO 104",
    items: [
      { id: "b104-1", tag: "6C-PP-107", status: EquipmentStatus.STANDBY },
      { id: "b104-2", tag: "6C-PP-207", status: EquipmentStatus.RUNNING },
      { id: "b104-3", tag: "6C-PP-307", status: EquipmentStatus.STANDBY },
    ]
  },
  {
    name: "SPILLAGE PUMPS – PLANTA C",
    items: [
      { id: "spc1", tag: "6C-PP-210", status: EquipmentStatus.RUNNING },
      { id: "spc2", tag: "6C-PP-211", status: EquipmentStatus.RUNNING },
      { id: "spc3", tag: "6C-PP-212", status: EquipmentStatus.RUNNING },
      { id: "spc4", tag: "7C-PP-114", status: EquipmentStatus.STANDBY },
      { id: "spc5", tag: "6C-PP-106", status: EquipmentStatus.RUNNING },
    ]
  },
  {
    name: "SPILLAGE PUMPS – PLANTA D",
    items: [
      { id: "spd1", tag: "6D-PP-210", status: EquipmentStatus.RUNNING },
      { id: "spd2", tag: "6D-PP-211", status: EquipmentStatus.RUNNING },
      { id: "spd3", tag: "6D-PP-212", status: EquipmentStatus.RUNNING },
      { id: "spd4", tag: "7D-PP-109", status: EquipmentStatus.RUNNING },
      { id: "spd5", tag: "7D-PP-108", status: EquipmentStatus.RUNNING },
      { id: "spd6", tag: "9D-PP-106", status: EquipmentStatus.RUNNING },
    ]
  },
];
